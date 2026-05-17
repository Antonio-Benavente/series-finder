export const handleApiError = (error, context) => {
  console.error(`[API Error] ${context}:`, error);
  return { error: true, data: [] };
};
