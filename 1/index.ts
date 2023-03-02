import assert from "assert";

function getRanges(arr: number[] = [0, 1, 2, 3, 4, 7, 8, 10]): string {
    if (!Array.isArray(arr)) return "";

    const res: (number | string)[] = [];

    let start: number | null = null;
    for (let index = 0; index < arr.length; index++) {
        const el = arr[index];
        const next = arr[index + 1];

        if (start === null) start = index;

        if (Math.abs(next - el) !== 1) {
            if (index !== start) res.push(`${arr[start]}-${el}`);
            else res.push(el);

            start = null;
        }
    }

    return res.join(",");
}

assert.equal(getRanges([0, 1, 2, 3, 4, 7, 8, 10]), "0-4,7-8,10");
assert.equal(getRanges([2, 3, 8, 9]), "2-3,8-9");
assert.equal(getRanges([4, 7, 10]), "4,7,10");
