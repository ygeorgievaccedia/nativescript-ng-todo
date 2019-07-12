import "reflect-metadata";
import { FriendlyDatePipe } from "~/app/shared/pipes/friendly-date.pipe";

describe("Friendly Pipe", () => {
    it("transform date, friendly type, less than 1 minute should return few moments ago", () =>{
        const pipe = new FriendlyDatePipe();

        expect(pipe.transform(new Date(), "friendly")).toBe("a few moments ago");
    })
})
