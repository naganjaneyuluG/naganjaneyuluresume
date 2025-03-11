
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Calendar as CalendarIcon, Clock, User, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface MeetingRequest {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface AvailabilitySlot {
  id: string;
  day: string; // 0-6 for Sunday-Saturday
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const DEFAULT_AVAILABILITY: AvailabilitySlot[] = [
  { id: "1", day: "1", startTime: "09:00", endTime: "12:00", isAvailable: true },
  { id: "2", day: "1", startTime: "13:00", endTime: "17:00", isAvailable: true },
  { id: "3", day: "3", startTime: "09:00", endTime: "12:00", isAvailable: true },
  { id: "4", day: "3", startTime: "13:00", endTime: "17:00", isAvailable: true },
  { id: "5", day: "5", startTime: "09:00", endTime: "12:00", isAvailable: true },
];

const MeetingScheduler = () => {
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(DEFAULT_AVAILABILITY);
  const [newSlot, setNewSlot] = useState<Omit<AvailabilitySlot, "id">>({
    day: "1",
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true
  });
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    // Load meeting requests
    const savedRequests = localStorage.getItem("meetingRequests");
    if (savedRequests) {
      setMeetingRequests(JSON.parse(savedRequests));
    }

    // Load availability
    const savedAvailability = localStorage.getItem("availability");
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    } else {
      localStorage.setItem("availability", JSON.stringify(DEFAULT_AVAILABILITY));
    }
  }, []);

  const handleStatusChange = (id: string, status: "accepted" | "rejected") => {
    const updatedRequests = meetingRequests.map(request => 
      request.id === id ? { ...request, status } : request
    );
    
    setMeetingRequests(updatedRequests);
    localStorage.setItem("meetingRequests", JSON.stringify(updatedRequests));
    
    toast.success(`Meeting request ${status}`);
  };

  const addAvailabilitySlot = () => {
    const newId = Date.now().toString();
    const updatedAvailability = [...availability, { ...newSlot, id: newId }];
    
    setAvailability(updatedAvailability);
    localStorage.setItem("availability", JSON.stringify(updatedAvailability));
    
    // Reset form
    setNewSlot({
      day: "1",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true
    });
    
    toast.success("Availability slot added");
  };

  const removeAvailabilitySlot = (id: string) => {
    const updatedAvailability = availability.filter(slot => slot.id !== id);
    setAvailability(updatedAvailability);
    localStorage.setItem("availability", JSON.stringify(updatedAvailability));
    toast.success("Availability slot removed");
  };

  const getDayName = (day: string) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[parseInt(day)];
  };

  const pendingRequests = meetingRequests.filter(req => req.status === "pending");
  const pastMeetings = meetingRequests.filter(req => req.status !== "pending");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="requests">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Meeting Requests</TabsTrigger>
          <TabsTrigger value="availability">Manage Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-6">
          <h3 className="text-xl font-semibold">Pending Requests ({pendingRequests.length})</h3>
          
          {pendingRequests.length === 0 ? (
            <Card className="p-8 text-center bg-muted/40">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No pending meeting requests.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold text-lg flex items-center gap-2">
                            <User className="h-4 w-4" /> {request.name}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4" /> {request.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium flex items-center gap-2 justify-end">
                            <CalendarIcon className="h-4 w-4" /> {request.date}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 justify-end mt-1">
                            <Clock className="h-4 w-4" /> {request.time}
                          </div>
                        </div>
                      </div>
                      
                      {request.message && (
                        <div className="bg-secondary/50 p-4 rounded-md text-secondary-foreground">
                          <p className="text-sm font-medium mb-1 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" /> Message:
                          </p>
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleStatusChange(request.id, "rejected")}
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleStatusChange(request.id, "accepted")}
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {pastMeetings.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8">Past Meetings</h3>
              <div className="space-y-4">
                {pastMeetings.map(meeting => (
                  <Card key={meeting.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            <User className="h-4 w-4" /> {meeting.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-2 mt-1">
                              <CalendarIcon className="h-4 w-4" /> {meeting.date} at {meeting.time}
                            </span>
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          meeting.status === "accepted" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {meeting.status === "accepted" ? "Accepted" : "Declined"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Set Your Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Day of week</Label>
                  <select 
                    id="day"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
                  >
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                  />
                </div>
              </div>
              
              <Button 
                onClick={addAvailabilitySlot} 
                className="flex items-center gap-2 w-full md:w-auto mt-2"
              >
                Add Availability Slot
              </Button>
            </CardContent>
          </Card>
          
          <h3 className="text-xl font-semibold mt-4">Current Availability</h3>
          
          {availability.length === 0 ? (
            <Card className="p-8 text-center bg-muted/40">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No availability slots set up yet.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {availability.map(slot => (
                <Card key={slot.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{getDayName(slot.day)}</h4>
                      <p className="text-sm text-muted-foreground">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => removeAvailabilitySlot(slot.id)}
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                />
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Selected date: {date ? format(date, 'PPP') : 'None'}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingScheduler;
