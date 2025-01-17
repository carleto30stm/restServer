


export class TodoDTO {
    constructor(
        public readonly text: string,
    ){}
    static create(object: {[key: string]: any}): [string?, TodoDTO?] {
        const { text } = object;
        if (!text) return ['Text is required'];
        return [undefined, new TodoDTO(text)];
    }
}