import { objectToFormData, formDataToObject } from "./formDataHelper";

describe("objectToFormData", () => {
    it('should convert a simple object to a formData object', () => {
        const obj = { a: "1", b: "2" };
        const result = objectToFormData(obj);
        expect(result.get("a")).toBe("1");
        expect(result.get("b")).toBe("2");

        expect(result.get("a")).toEqual(obj.a);
        expect(result.get("b")).toEqual(obj.b);
    });

    it('should handle nested objects', () => {
        const obj = { post: { title: 'hello world!', body: 'this is a test' } };
        const result = objectToFormData(obj);
        expect(result.get("post[title]")).toEqual(obj.post.title);
        expect(result.get("post[body]")).toEqual(obj.post.body);
    });

    it('should handle Date objects', () => {
        const obj = { post: { title: 'the title object', body: 'the body object', created_at: new Date("2024-01-01") } };
        const result = objectToFormData(obj);
        expect(result.get("post[created_at]")).toEqual(obj.post.created_at.toISOString());
    });

    it('should handle file objects', () => {
        const file = new File([""], "test.jpg", { type: "image/jpeg" });
        const obj = { post: { title: 'the title object', body: 'the body object', image: file } };
        const result = objectToFormData(obj);
        expect(result.get("post[image]")).toEqual(obj.post.image);
    });
});

describe("formDataToObject", () => {
    
    it('should convert formData to an object', () => {
        const formData = new FormData();
        formData.append("a", "1");
        formData.append("b", "2");

        const result = formDataToObject(formData);
        expect(result).toEqual({ a: "1", b: "2"});
        });
});