import TurndownService from "turndown";

const turndownService = new TurndownService();

turndownService.addRule('pre', {
    filter: 'pre',
    replacement: function(content) {
      return '```' + content + '```';
    }
  });

export const convertToMarkdown = (value: string) => {
  return turndownService.turndown(value);
};
