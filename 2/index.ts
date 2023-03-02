import assert from "assert";

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

assert.equal(findBrokenTag("<div><span></span></div>"), true);
assert.equal(findBrokenTag("<div><span></Span></div>"), "span");
assert.equal(findBrokenTag("<div><span><span><span><div></span></span></div>"), "span");
