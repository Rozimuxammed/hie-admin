import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PostCategory } from "../requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  setCategory,
  setLoading,
} from "../lib/redux/slices/category/category-slice";
import { toast } from "sonner";
import { Edit, RefreshCcw, Trash2 } from "lucide-react";
import { format } from "date-fns";
export default function Categories() {
  const { categories, loading } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const hundleSubmit = (e) => {
    e.preventDefault();
    let translationObj = {};
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      translationObj[key] = value;
    }
    const res = {
      translation: [translationObj],
    };
    dispatch(setLoading());
    PostCategory(res)
      .then(
        (data) => {
          dispatch(setCategory(data));
          e.target.reset();
        },
        ({ message }) => {
          toast.error(message || "Xatolik yuz berdi, qaytadan urinib ko'ring");
        }
      )
      .finally(() => {
        dispatch(setLoading());
      });
  };

  const langs = [
    { value: "ru", label: "Русский" },
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी" },
    { value: "es", label: "Español" },
    { value: "zh", label: "普通话" },
    { value: "ur", label: "اردو" },
    { value: "bn", label: "বাংলা" },
    { value: "tl", label: "Filipino" },
    { value: "uk", label: "Українська" },
  ];

  return (
    <>
      <section>
        <div className="container mx-auto px-2.5">
          <form onSubmit={hundleSubmit} className="flex items-center w-full">
            <Input
              type="text"
              name="name"
              required
              className="shadow-none border-r-0 rounded-tr-none rounded-br-none"
              placeholder="Add category..."
            />
            <Select name="language">
              <SelectTrigger className="w-[150px] border-r-0 rounded-none shadow-none">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                {langs.map(({ value, label }, i) => {
                  return (
                    <SelectItem key={i} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className={
                "shadow-none cursor-pointer rounded-tl-none rounded-bl-none w-14"
              }
              variant={"outline"}
              disabled={loading}
            >
              {loading ? <RefreshCcw className="animate-spin" /> : "Add"}
            </Button>
          </form>
        </div>
      </section>
      <section className="container mx-auto px-2.5 mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] font-bold">ID</TableHead>
              <TableHead className="w-[150px] font-bold">Name</TableHead>
              <TableHead className="font-bold">Created</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{categories.id}</TableCell>
              <TableCell>{categories.translation.map((t) => t.name)}</TableCell>
              <TableCell>
                {format(new Date(categories.createdAt), "dd.MM.yyyy HH:mm")}
              </TableCell>
              <TableCell className="flex items-center gap-3 justify-end">
                <Button
                  variant="outline"
                  className={"w-7 h-7 rounded-sm cursor-pointer"}
                >
                  <Edit />
                </Button>
                <Button
                  variant="destructive"
                  className={"w-7 h-7 rounded-sm cursor-pointer"}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </>
  );
}
