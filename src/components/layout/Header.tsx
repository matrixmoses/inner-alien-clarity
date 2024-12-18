import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { PersistentTimer } from "@/components/PersistentTimer";
import { ClearDataButton } from "./ClearDataButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => Promise<void>;
}

export const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setAvatarUrl(profile.avatar_url);
          setFullName(profile.full_name);
        }
      }
    };

    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated]);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          TheInnerAlien.co
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && <PersistentTimer />}
          {isAuthenticated && <ClearDataButton />}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={avatarUrl ? `${supabase.storage.from('avatars').getPublicUrl(avatarUrl).data.publicUrl}` : undefined}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {fullName ? fullName[0].toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};