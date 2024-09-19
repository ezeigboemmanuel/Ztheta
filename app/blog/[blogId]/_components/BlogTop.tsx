import Image from "next/image";
import { Ellipsis, Eye, Heart, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BlogTopProps {
  tags: string[];
  imageUrl: string | undefined;
  authorName: string | undefined;
  likes: number | undefined;
  views: number;
  userId: Id<"users"> | undefined;
  authorId: Id<"users"> | undefined;
  blogId: Id<"blogs">;
}
const BlogTop = ({
  tags,
  imageUrl,
  authorName,
  likes,
  views,
  userId,
  authorId,
  blogId,
}: BlogTopProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const deleteBlog = useMutation(api.blogs.deleteBlog);
  const onDelete = async () => {
    deleteBlog({ id: blogId });
    toast.success("Article deleted successfully.");
    router.push("/");
  };
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            }
            alt="profile_img"
            width={500}
            height={500}
            className="h-12 w-12 object-cover object-center rounded-full"
          />
          <div>
            {/* should go to user page */}
            <Link
              href={`/profile/${authorId}`}
              className="font-semibold hover:underline md:text-lg"
            >
              {authorName}
            </Link>
            <p className="text-gray-500 text-sm md:text-base">Author</p>
          </div>
        </div>

        <div className="flex space-x-3 md:space-x-5 items-center">
          <Share className="h-5 w-5 stroke-[#6C40FE]" />
          <div className="flex space-x-1 items-center">
            <Heart className="h-5 w-5 stroke-[#6C40FE]" />
            <p className="text-[#6C40FE]">{likes == undefined ? "0" : likes}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <Eye className="h-5 w-5 stroke-[#6C40FE]" />
            <p className="text-[#6C40FE]">{views}</p>
          </div>

          {userId == authorId && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/blog/${blogId}/edit`);
                    }}
                    className="cursor-pointer"
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDialogOpen(true)} 
                    className="text-red-500 hover:!text-red-500  cursor-pointer"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  {/* Empty div or span, as we trigger dialog from dropdown */}
                  <span></span>
                </DialogTrigger>
                <div className="mx-2">
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your article and your article comments from our
                        database.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button onClick={onDelete} variant="destructive">
                        Delete
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            </div>
          )}
        </div>
      </div>
      <div>
        {tags.map((tag) => (
          <div
            key={tag}
            className="mr-2 bg-gray-800 text-gray-200 text-xs md:text-sm inline-flex items-center px-5 py-1.5 rounded-full"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogTop;
