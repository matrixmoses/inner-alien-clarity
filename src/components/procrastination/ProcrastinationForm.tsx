import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProcrastinationFormProps {
  reason: string;
  customReason: string;
  reflection: string;
  onReasonChange: (value: string) => void;
  onCustomReasonChange: (value: string) => void;
  onReflectionChange: (value: string) => void;
}

export const ProcrastinationForm = ({
  reason,
  customReason,
  reflection,
  onReasonChange,
  onCustomReasonChange,
  onReflectionChange,
}: ProcrastinationFormProps) => {
  return (
    <div className="space-y-4">
      <RadioGroup value={reason} onValueChange={onReasonChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="too_difficult" id="too_difficult" />
          <Label htmlFor="too_difficult">Too difficult</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lack_of_motivation" id="lack_of_motivation" />
          <Label htmlFor="lack_of_motivation">Lack of motivation</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="forgot" id="forgot" />
          <Label htmlFor="forgot">Forgot</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Other reason</Label>
        </div>
      </RadioGroup>

      {reason === "custom" && (
        <Textarea
          placeholder="Please describe your reason..."
          value={customReason}
          onChange={(e) => onCustomReasonChange(e.target.value)}
        />
      )}

      <Textarea
        placeholder="Reflect on why this happened..."
        value={reflection}
        onChange={(e) => onReflectionChange(e.target.value)}
      />
    </div>
  );
};