"use server";

import { revalidatePath } from "next/cache";

/**
 * GITHUB API COST CLARIFICATION:
 * For individual users and small organizations, the GitHub API is FREE.
 * - Authenticated requests (via Token) allow 5,000 requests per hour.
 * - GitHub Actions has a VERY generous free tier (2,000 mins/month), 
 *   which is 100x more than what this tiny CMS will ever use.
 */

const token = process.env.GITHUB_TOKEN;
const owner = process.env.REPO_OWNER;
const repo = process.env.REPO_NAME;
const path = "src/data/articles.ts";

async function getGithubFile() {
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const resp = await fetch(getFileUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json"
        },
        cache: 'no-store'
    });
    if (!resp.ok) throw new Error("Failed to fetch repository data.");
    return await resp.json();
}

async function commitToGithub(content: string, sha: string, message: string) {
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const resp = await fetch(getFileUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            content: Buffer.from(content).toString("base64"),
            sha: sha
        })
    });
    if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || "Failed to commit change.");
    }
    return true;
}

export async function publishArticle(formData: any) {
    if (!token || !owner || !repo) return { success: false, message: "Server ENV vars missing." };

    try {
        const fileData = await getGithubFile();
        const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

        const newArticle = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            readTime: "8 min read"
        };

        const jsonString = JSON.stringify(newArticle, null, 4);

        // More robust way to find the end of the 'articles' array specifically
        const categoriesStart = currentContent.indexOf("export const categories");
        const articlesSection = currentContent.slice(0, categoriesStart);
        const arrayEndIndex = articlesSection.lastIndexOf("];");

        const updatedContent = articlesSection.slice(0, arrayEndIndex) + `    ${jsonString},\n` + articlesSection.slice(arrayEndIndex) + currentContent.slice(categoriesStart);

        await commitToGithub(updatedContent, fileData.sha, `feat(cms): add article "${formData.title}"`);
        revalidatePath("/articles");
        return { success: true, message: "Published successfully." };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteArticle(articleId: string) {
    if (!token || !owner || !repo) return { success: false, message: "Server ENV vars missing." };

    try {
        const fileData = await getGithubFile();
        const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

        // Use regex to remove the object with this ID. 
        // This is a simple parser that works for our specific file structure.
        const regex = new RegExp(`\\{\\s+"id":\\s+"${articleId}"[\\s\\S]*?\\},`, "g");
        const updatedContent = currentContent.replace(regex, "");

        await commitToGithub(updatedContent, fileData.sha, `feat(cms): delete article ID ${articleId}`);
        revalidatePath("/articles");
        return { success: true, message: "Article deleted." };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateArticle(articleId: string, formData: any) {
    if (!token || !owner || !repo) return { success: false, message: "Server ENV vars missing." };

    try {
        const fileData = await getGithubFile();
        const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

        const regex = new RegExp(`\\{\\s+"id":\\s+"${articleId}"[\\s\\S]*?\\}`, "g");
        const jsonString = JSON.stringify({ id: articleId, ...formData }, null, 4);
        const updatedContent = currentContent.replace(regex, jsonString);

        await commitToGithub(updatedContent, fileData.sha, `feat(cms): update article "${formData.title}"`);
        revalidatePath("/articles");
        return { success: true, message: "Article updated." };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
