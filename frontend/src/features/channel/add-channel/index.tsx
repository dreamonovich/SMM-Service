import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export interface AddChannelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChannel: FC<AddChannelProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const options = {
        method: "POST",
        headers: {
          Authorization:
            TOKEN_HEADER,
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            title: title,
            code: code,

        }),
      };

  const {id} = useParams()
  const [step, setStep] = useState(0);
  const handleClick = async () => {
    if (title && step === 0) {
      setStep(1);
    }
    if (title && step === 1) {
      setStep(2);
    }
    if (title && step === 2) {
      const res = await fetch(API_URL + "/workspace/" + id + "/channels", options);
      if (!res.ok) {
        //display error message
        setStep(1)
      }
      else{navigate(`/workspaces/${id}`);}
    }
  };

  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger>Добавить</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить новый канал</DialogTitle>
          <DialogDescription>
            <form className="w-5/6 space-y-6">
              <label>Введите название канала</label>
              {step == 0 && (
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Bebra Bebrenko"
                />
              )}
              {step == 1 && (
                <div>
                  <span>Добавьте бота в канал и напишите команду /add_bot</span>
                  <Link
                    to={"/instruction"}
                    className="hover:underline text-[#7AAEEE]"
                  >
                    инструкция
                  </Link>
                </div>
              )}
              {step == 2 && (
                <div>
                  <label>Введите код, отправленный ботом</label>
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="00000"
                  />
                </div>
              )}
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Продолжить
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
