"use server";

import { revalidatePath } from "next/cache";

/**
 * THE CLEVER CMS SOLUTION
 * This server action allows your client to 'publish' directly to the website code.
 * It uses the GitHub API to update the articles.ts file.
 */

export async function publishArticle(formData: any) {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    const path = "src/data/articles.ts";

    if (!token || !owner || !repo) {
        return { success: false, message: "Configuration missing." };
    }

    try {
        // 1. Get the current file content and its SHA
        const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const getFileResp = await fetch(getFileUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            },
            cache: 'no-store'
        });

        if (!getFileResp.ok) throw new Error("Failed to fetch current articles data.");
        const fileData = await getFileResp.json();
        const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

        // 2. Parse the existing array and append the new article
        const newArticle = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            readTime: "8 min read"
        };

        const jsonString = JSON.stringify(newArticle, null, 4);

        // Use a more robust regex to find the array end
        const arrayEndIndex = currentContent.lastIndexOf("];");
        if (arrayEndIndex === -1) throw new Error("Could not find end of articles array.");

        const updatedContent = currentContent.slice(0, arrayEndIndex) + `    ${jsonString},\n];`;

        // 3. Commit the change back to GitHub
        const updateResp = await fetch(getFileUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `feat(cms): publish new article "${formData.title}"`,
                content: Buffer.from(updatedContent).toString("base64"),
                sha: fileData.sha
            })
        });

        if (!updateResp.ok) {
            const err = await updateResp.json();
            throw new Error(err.message || "Failed to commit to GitHub.");
        }

        revalidatePath("/articles");
        return { success: true, message: "Published successfully." };

    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
