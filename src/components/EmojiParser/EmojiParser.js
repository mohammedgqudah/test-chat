import List, { shortNames } from "./List";
const shortNameToImage = value => {
    return value.replace(/:\w+:/g, $ => {
        if (List[$]) {
            return `<img alt="${$}" title="${$}" class="emoji" src="https://abs.twimg.com/emoji/v2/svg/${
                List[$].uc_base
            }.svg"/>`;
        } else {
            return $;
        }
    });
};

export default shortNameToImage;
export { List };
export { shortNames };
