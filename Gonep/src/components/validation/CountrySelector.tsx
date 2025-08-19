import { useState, useEffect } from "react";
import { cn } from "../ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function CountrySelector({ 
  value, 
  onValueChange, 
  placeholder = "Select country...",
  className,
  error = false
}: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flag');
        const data = await response.json();
        
        const formattedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flag
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        // Fallback to a basic list of countries
        setCountries([
          { name: "Kenya", code: "KE", flag: "🇰🇪" },
          { name: "Nigeria", code: "NG", flag: "🇳🇬" },
          { name: "South Africa", code: "ZA", flag: "🇿🇦" },
          { name: "Ghana", code: "GH", flag: "🇬🇭" },
          { name: "Uganda", code: "UG", flag: "🇺🇬" },
          { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
          { name: "Ethiopia", code: "ET", flag: "🇪🇹" },
          { name: "United States", code: "US", flag: "🇺🇸" },
          { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
          { name: "Canada", code: "CA", flag: "🇨🇦" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn(
        "w-full bg-background border-border text-foreground focus:border-primary focus:ring-primary",
        error && "border-destructive/50 focus:border-destructive",
        className
      )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading countries...
          </div>
        ) : (
          countries.map((country) => (
            <SelectItem key={country.code} value={country.name}>
              <div className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
