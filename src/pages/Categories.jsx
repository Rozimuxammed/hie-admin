import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DeleteCategory,
  GetCategory,
  PostCategory,
  updateCategory,
} from "../requests";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, Eye, RefreshCcw, Trash } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
export default function Categories() {
  const { categories, loading } = useSelector((state) => state.category);
  const [editCategory, setEditcategory] = useState(false);
  const [getId, setgetId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [CategoryName, setCategoryName] = useState(null);

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
        () => {
          e.target.reset();
          toast.success("Category added successfully");
          GetCategory().then((res) => dispatch(setCategory(res)));
        },
        ({ message }) => {
          toast.error(message || "Xatolik yuz berdi, qaytadan urinib ko'ring");
        }
      )
      .finally(() => {
        dispatch(setLoading());
      });
  };

  useEffect(() => {
    GetCategory().then(
      (res) => {
        dispatch(setCategory(res));
      },
      ({ message }) => {
        toast.error(message || "Kategoriyalarni olishda xatolik yuz berdi");
      }
    );
  }, []);

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

  const deleted = (id) => {
    setDeletingId(id);
    DeleteCategory(id)
      .then(() => {
        toast.success("Category deleted successfully");
        GetCategory().then((res) => dispatch(setCategory(res)));
      })
      .catch(({ message }) => {
        toast.error(message || "Failed to delete category");
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  const update = (id, obj) => {
    setEditcategory(true);
    setgetId(id);
    setCategoryName(obj);
  };

  const hundleUpdate = (e) => {
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
    updateCategory(res, getId)
      .then(
        () => {
          toast.success("Category update successfully");
          setEditcategory(false);
          GetCategory().then((res) => dispatch(setCategory(res)));
        },
        ({ message }) => {
          toast.error(message || "Xatolik yuz berdi, qaytadan urinib ko'ring");
        }
      )
      .finally(() => {
        dispatch(setLoading());
      });
  };

  const closeModal = () => {
    setEditcategory(false);
  };

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
              <SelectTrigger className="w-[120px]  border-r-0 rounded-none shadow-none">
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
                "shadow-none cursor-pointer dark:bg-[#151515] rounded-tl-none rounded-bl-none w-14"
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
        <div>
          {/* Table view for desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] font-bold">ID</TableHead>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">CreatedTime</TableHead>
                  <TableHead className="text-right font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories && categories.length > 0
                  ? categories.map(({ id, createdAt, translation }) => (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{id}</TableCell>
                        <TableCell>
                          {translation?.map((t) => t.name).join(", ")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(createdAt), "dd-MM-yyyy HH:mm:ss")}
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-2.5">
                          {/* <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer dark:text-white"
                          >
                            <Eye />
                          </Button> */}
                          <Button
                            onClick={() => update(id, translation)}
                            variant="outline"
                            size="icon"
                            className="cursor-pointer bg-amber-200 dark:text-gray-950"
                          >
                            <Edit />
                          </Button>
                          <Button
                            onClick={() => setPendingDeleteId(id)}
                            variant="destructive"
                            size="icon"
                            className="cursor-pointer"
                            disabled={deletingId === id}
                          >
                            {deletingId === id ? (
                              <RefreshCcw className="animate-spin" />
                            ) : (
                              <Trash />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : Array.from({ length: 10 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-8 w-7 rounded-sm" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-64 rounded-sm" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-56 rounded-sm" />
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-2.5">
                          <Skeleton className="h-8 w-8 rounded-sm" />
                          <Skeleton className="h-8 w-8 rounded-sm" />
                          <Skeleton className="h-8 w-8 rounded-sm" />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          {/* Card view for mobile */}
          <div className="block md:hidden space-y-4">
            {categories && categories.length > 0
              ? categories.map(({ id, createdAt, translation }) => (
                  <div
                    key={id}
                    className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900"
                  >
                    <p className="text-sm font-semibold">
                      <span className="text-gray-500">ID:</span> {id}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-500">Name:</span>{" "}
                      {translation?.map((t) => t.name).join(", ")}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-500">Created:</span>{" "}
                      {format(new Date(createdAt), "dd-MM-yyyy HH:mm:ss")}
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                      {/* <Button
                        variant="outline"
                        size="icon"
                        className="dark:text-white"
                      >
                        <Eye />
                      </Button> */}
                      <Button
                        onClick={() => update(id, translation)}
                        variant="outline"
                        size="icon"
                        className="bg-amber-200 dark:text-gray-950"
                      >
                        <Edit />
                      </Button>
                      <Button
                        onClick={() => deleted(id)}
                        variant="destructive"
                        size="icon"
                        disabled={deletingId === id}
                      >
                        {deletingId === id ? (
                          <RefreshCcw className="animate-spin" />
                        ) : (
                          <Trash />
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              : Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm space-y-2"
                  >
                    <Skeleton className="h-4 w-10 rounded-sm" />
                    <Skeleton className="h-4 w-44 rounded-sm" />
                    <Skeleton className="h-4 w-56 rounded-sm" />
                    <div className="flex justify-end gap-2 pt-2">
                      <Skeleton className="h-8 w-8 rounded-sm" />
                      <Skeleton className="h-8 w-8 rounded-sm" />
                      <Skeleton className="h-8 w-8 rounded-sm" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {editCategory && (
        <section className="absolute top-24 w-full bg-white dark:bg-gray-950">
          <div className="container mx-auto px-2.5">
            <form onSubmit={hundleUpdate} className="flex items-center w-full">
              <Input
                type="text"
                name="name"
                defaultValue={`${
                  CategoryName && CategoryName.map((t) => t.name).join(", ")
                }`}
                required
                className="shadow-none border-r-0 border-gray-950/50 rounded-tr-none rounded-br-none"
                placeholder="Update category..."
              />
              <Select name="language">
                <SelectTrigger className="w-[90px] border-gray-950/50 border-r-0 rounded-none shadow-none">
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
                  "shadow-none border-gray-950/50 cursor-pointer dark:border-0 dark:bg-[#0f121c] border-r-0 rounded-tl-none rounded-tr-none rounded-bl-none rounded-br-none w-16"
                }
                variant={"outline"}
                disabled={loading}
              >
                {loading ? <RefreshCcw className="animate-spin" /> : "Update"}
              </Button>
              <Button
                onClick={closeModal}
                className={
                  "shadow-none border-gray-950/50 cursor-pointer dark:bg-[#0f121c] dark:border-0 rounded-tl-none rounded-bl-none w-16"
                }
                type="submit"
                variant={"outline"}
              >
                Cancel
              </Button>
            </form>
          </div>
        </section>
      )}

      <Dialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Haqiqatan o‘chirilsinmi?</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p>
              Bu kategoriyani o‘chirishni xohlaysizmi? Bu amalni bekor qilib
              bo‘lmaydi.
            </p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setPendingDeleteId(null)}
              disabled={!!deletingId}
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (pendingDeleteId) {
                  deleted(pendingDeleteId);
                  setPendingDeleteId(null);
                }
              }}
              disabled={!!deletingId}
            >
              Ha, o‘chirilsin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
