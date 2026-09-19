export default async ({ res, log }) => {
  log("Hello from the EdgeZ project template");

  return res.json({
    message: "Hello World",
    databaseId: "main",
    tableId: "messages",
    bucketId: "uploads"
  });
};
