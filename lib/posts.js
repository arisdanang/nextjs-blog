import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((filename) => {
    // remove ".md" from file name to get id
    const id = filename.replace(/\.md$/, "");

    // read markdown file as string
    const fullPath = path.join(postDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // menggunakan gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // menggunakan remark untuk konversi markdown ke html string
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  const contentHTML = processedContent.toString();

  // menggabungkan data dengan id
  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
}
