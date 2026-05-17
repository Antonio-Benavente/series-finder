const MAX_DESCRIPTION_LENGTH = 150;

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function sanitizeDescription(html) {
  const plain = stripHtml(html);
  return truncateText(plain, MAX_DESCRIPTION_LENGTH) || 'Descripción no disponible';
}
