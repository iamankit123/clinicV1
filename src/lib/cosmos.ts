import { CosmosClient, Container } from "@azure/cosmos";

let cachedContainer: Container | null = null;

export function getAppointmentsContainer(): Container | null {
  if (cachedContainer) return cachedContainer;

  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;
  const databaseId = process.env.COSMOS_DATABASE || "clinic";
  const containerId = process.env.COSMOS_CONTAINER || "appointments";

  if (!endpoint || !key) return null;

  const client = new CosmosClient({ endpoint, key });
  cachedContainer = client.database(databaseId).container(containerId);
  return cachedContainer;
}

export function isCosmosConfigured(): boolean {
  return Boolean(process.env.COSMOS_ENDPOINT && process.env.COSMOS_KEY);
}
