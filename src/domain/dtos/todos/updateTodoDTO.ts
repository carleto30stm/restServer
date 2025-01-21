


export class UpdateDTO {
    constructor(
        public readonly text: string,
    ){}
    static update(object: {[key: string]: any}): [string?, UpdateDTO?] {
        const { text } = object;
        if (!text) return ['Text is required'];
        return [undefined, new UpdateDTO(text)];
    }
}