export class HighLighter {

  static highlight(search: string, text: string): {
    totalHighLighted: number,
    tokens: {
      word: string
      shouldHighlight: boolean,
    }[]
  } {

    const searchTokens = search
      .toLowerCase()
      .trim()
      .split(/\W+/)

    let totalHighLighted = 0;

    const textTokens = text
      .trim()
      .split(/\s+/)
      .reduce<{ [key: string]: { shouldHighlight: boolean, word: string } }>((acc, textToken) => {
        const shouldHighlight = !!searchTokens.find(searchToken => 
          textToken.toLowerCase().split(/\W+/).includes(searchToken)
        );
  
        if (shouldHighlight) {
          totalHighLighted++;
        }

        acc[textToken] = { 
          word: textToken,
          shouldHighlight,
        };
        
        return acc;
      }, {});

    
    return {
      totalHighLighted,
      tokens: Object.values(textTokens)
    }
  }

}
