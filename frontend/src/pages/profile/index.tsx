import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { Label } from "@/shared/ui/label";
export const Profile = () => {
  const form = useForm();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Ваш профиль</h1>
          <h2 className="text-l text-gray-500">
            Так вас будут видеть другие пользователи
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="mr-4">
            <div className="text-3xl font-semibold text-right">Username</div>
            <div className="text-l text-gray-500 text-right">@telegram</div>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="mb-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/6 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Bebra Bebrenko" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div></div>
    </div>
  );
};
