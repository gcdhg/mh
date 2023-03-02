import assert from "assert";

/**
 * найти не закрытый тэг
 *
 * @param str
 * @returns
 */
function findBrokenTag(str: string): boolean | string {
    const tags: RegExpMatchArray | null = str.match(/(?<=<)(.+?)(?=>)/gm);

    if (!tags) return true;

    const mapping: Record<string, number[]> = {};

    tags.forEach((tag, index) => {
        if (!(tag[0] == "/")) {
            mapping[tag] ||= [];
            mapping[tag].push(index);
        } else mapping[tag.slice(1)]?.pop();
    });

    const res = Math.min(...Object.values(mapping).map((el) => Math.min(...el)));

    return tags[res] || true;
}

/**
 * с проверкой валидности верстки
 *
 * @param str
 * @returns
 */
function findBrokenTagV2(str: string): boolean | string {
    const tags: RegExpMatchArray | null = str.match(/(?<=<)(.+?)(?=>)/gm);

    if (!tags) return true;

    const mapping: Record<string, number[]> = {};

    let isValid: boolean = true;
    const check: string[] = [];

    tags.forEach((tag, index) => {
        const isClose = tag[0] == "/";
        const mainTag = isClose ? tag.slice(1) : tag;

        let lastOpen = check[check.length - 1];

        if (isValid) {
            if (isClose) {
                if (lastOpen !== mainTag) isValid = false;
                else check.pop();
            } else check.push(tag);
        }

        if (!isClose) {
            mapping[tag] ||= [];
            mapping[tag].push(index);
        } else mapping[mainTag]?.pop();
    });

    const res = Math.min(...Object.values(mapping).map((el) => Math.min(...el)));

    return tags[res] || isValid;
}

assert.equal(findBrokenTag("<div><span></span></div>"), true);
assert.equal(findBrokenTag("<div><span></Span></div>"), "span");
assert.equal(findBrokenTag("<div><span><span><span></span></span></div>"), "span");

assert.equal(findBrokenTagV2("<div><span></div></span>"), false);
assert.equal(findBrokenTagV2("<div><span></div>"), "span");
assert.equal(findBrokenTagV2("<div><span></span></div>"), true);
