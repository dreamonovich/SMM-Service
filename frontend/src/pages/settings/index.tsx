import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export  function Settings() {
  //get from backend
  const link = "https://bebra.com"
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Настройки рабочего пространства</h2>
      <div className="flex items-center justify-between mb-4">
        <Input className="border-gray-300" readOnly type="text" value={link} />
        <Button className="ml-2" variant="secondary">
          Copy Link
        </Button>
      </div>
      <hr className="my-4" />
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">People with access</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage alt="Olivia Martin" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Olivia Martin</div>
                <div className="text-sm text-gray-500">m@example.com</div>
              </div>
            </div>
            <Select>
              <SelectTrigger id="user1">
                <SelectValue>Can edit</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="can-edit">Can edit</SelectItem>
                <SelectItem value="can-view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage alt="Isabella Nguyen" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Isabella Nguyen</div>
                <div className="text-sm text-gray-500">b@example.com</div>
              </div>
            </div>
            <Select>
              <SelectTrigger id="user2">
                <SelectValue>Can view</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="can-edit">Can edit</SelectItem>
                <SelectItem value="can-view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage alt="Sofia Davis" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Sofia Davis</div>
                <div className="text-sm text-gray-500">p@example.com</div>
              </div>
            </div>
            <Select>
              <SelectTrigger id="user3">
                <SelectValue>Can view</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="can-edit">Can edit</SelectItem>
                <SelectItem value="can-view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <Button className="w-full" variant="destructive">
        Leave team
      </Button>
    </div>
  )
}
