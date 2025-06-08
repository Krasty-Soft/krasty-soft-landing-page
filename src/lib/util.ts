export function formatTagLabel(tag: string): string {
  switch (tag.toLowerCase()) {
    case 'ux/ui':
      return 'UX/UI';
    case 'ux research':
      return 'UX research';
    case 'qa':
      return 'QA';
    default:
      return tag
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
}

type Data = {
  tags: string[]
}

export function generateTagFilters(data: Data[], allLabel: string) {
  const tagMap = new Map<string, number>();

  for (const item of data) {
    for (const tag of item.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return [
    {
      label: allLabel,
      value: 'all',
      count: data.length,
    },
    ...Array.from(tagMap.entries()).map(([tag, count]) => ({
      label: tag,
      value: tag,
      count,
    }))
  ];
}
