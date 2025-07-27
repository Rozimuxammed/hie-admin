import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { validation } from "../validations"; 

export default function Categories() {
  const hundleSubmit = (e) => {
    e.preventDefault();
    const res = {};
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      res[key] = value;
    }
    const result = validation(res);
    console.log(result);
  };

  return (
    <section>
      <div className="container mx-auto px-2.5">
        <form onSubmit={hundleSubmit} className="flex items-center w-full">
          <Input
            type="text"
            name="name"
            className="shadow-none border-r-0 rounded-tr-none rounded-br-none"
            placeholder="Kategoriya qo'shing..."
          />
          <Button
            type="submit"
            className={
              "shadow-none cursor-pointer rounded-tl-none rounded-bl-none"
            }
            variant={"outline"}
          >
            Qo'shish
          </Button>
        </form>
      </div>
    </section>
  );
}
