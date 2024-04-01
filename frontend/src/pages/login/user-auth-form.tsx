import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Icons } from "@/shared/ui/icons";
import { Input } from "@/shared/ui/input";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);
  const { t } = useTranslation();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowTelegram(true);
    }, 1000);
  }
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /*
<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="samplebot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
<script type="text/javascript">
  function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  }
</script>
 */

    if (!showTelegram || !scriptRef.current) return;
    console.log(showTelegram, scriptRef);

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute(
      "data-telegram-login",
      "prodsmm_service_bot"
    );
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    script.async = true;
    scriptRef.current.appendChild(script)
  }, [showTelegram, scriptRef]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="username"
              placeholder={t("username")}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                localStorage.setItem('name', e.target.value)
              }}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t("sign-in")}
          </Button>
        </div>
      </form>
      {showTelegram && <div ref={scriptRef}></div>}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* add login functionality */}
      {/* <Button onClick={() => setIsLoading(true)} variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
