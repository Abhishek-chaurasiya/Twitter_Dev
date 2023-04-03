import { execute } from "../../services/dummy-service.js";

test('result is true and return Learning js',()=>{
    const result = execute()
    expect(result).toBe('Learning js')

})