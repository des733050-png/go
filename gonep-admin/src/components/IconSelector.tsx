import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  TextField,
} from '@mui/material';
import {
  People,
  EmojiEvents,
  Favorite,
  Lightbulb,
  Star,
  TrackChanges,
  FlashOn,
  Security,
  Language,
  AccessTime,
  TrendingUp,
  CheckCircle,
  Visibility,
  Psychology,
  Memory,
  Storage,
  Wifi,
  PhoneAndroid,
  Tablet,
  Monitor,
  Dns,
  Cloud,
  Lock,
  LockOpen,
  VpnKey,
  Settings,
  Build,
  Settings as Cog,
  FilterList,
  Search,
  Add,
  Remove,
  Close,
  Check,
  Error,
  Info,
  Help,
  MenuBook,
  School,
  Work,
  Home,
  LocationOn,
  Event,
  Person,
  PersonAdd,
  PersonAddAlt1,
  PersonRemove,
  ThumbUp,
  ThumbDown,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
} from '@mui/icons-material';

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const iconOptions = [
  { value: 'users', label: 'Users', icon: People },
  { value: 'award', label: 'Award', icon: EmojiEvents },
  { value: 'heart', label: 'Heart', icon: Favorite },
  { value: 'lightbulb', label: 'Lightbulb', icon: Lightbulb },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'target', label: 'Target', icon: TrackChanges },
  { value: 'zap', label: 'Zap', icon: FlashOn },
  { value: 'shield', label: 'Shield', icon: Security },
  { value: 'globe', label: 'Globe', icon: Language },
  { value: 'clock', label: 'Clock', icon: AccessTime },
  { value: 'trendingup', label: 'Trending Up', icon: TrendingUp },
  { value: 'checkcircle', label: 'Check Circle', icon: CheckCircle },
  { value: 'eye', label: 'Eye', icon: Visibility },
  { value: 'brain', label: 'Brain', icon: Psychology },
  { value: 'cpu', label: 'CPU', icon: Memory },
  { value: 'database', label: 'Database', icon: Storage },
  { value: 'wifi', label: 'WiFi', icon: Wifi },
  { value: 'smartphone', label: 'Smartphone', icon: PhoneAndroid },
  { value: 'tablet', label: 'Tablet', icon: Tablet },
  { value: 'monitor', label: 'Monitor', icon: Monitor },
  { value: 'server', label: 'Server', icon: Dns },
  { value: 'cloud', label: 'Cloud', icon: Cloud },
  { value: 'lock', label: 'Lock', icon: Lock },
  { value: 'unlock', label: 'Unlock', icon: LockOpen },
  { value: 'key', label: 'Key', icon: VpnKey },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'wrench', label: 'Wrench', icon: Build },
  { value: 'cog', label: 'Cog', icon: Cog },
  { value: 'filter', label: 'Filter', icon: FilterList },
  { value: 'search', label: 'Search', icon: Search },
  { value: 'plus', label: 'Plus', icon: Add },
  { value: 'minus', label: 'Minus', icon: Remove },
  { value: 'x', label: 'X', icon: Close },
  { value: 'check', label: 'Check', icon: Check },
  { value: 'alertcircle', label: 'Alert Circle', icon: Error },
  { value: 'info', label: 'Info', icon: Info },
  { value: 'helpcircle', label: 'Help Circle', icon: Help },
  { value: 'bookopen', label: 'Book Open', icon: MenuBook },
  { value: 'graduationcap', label: 'Graduation Cap', icon: School },
  { value: 'briefcase', label: 'Briefcase', icon: Work },
  { value: 'home', label: 'Home', icon: Home },
  { value: 'mappin', label: 'Map Pin', icon: LocationOn },
  { value: 'calendar', label: 'Calendar', icon: Event },
  { value: 'user', label: 'User', icon: Person },
  { value: 'userplus', label: 'User Plus', icon: PersonAdd },
  { value: 'usercheck', label: 'User Check', icon: PersonAddAlt1 },
  { value: 'userx', label: 'User X', icon: PersonRemove },
  { value: 'thumbsup', label: 'Thumbs Up', icon: ThumbUp },
  { value: 'thumbsdown', label: 'Thumbs Down', icon: ThumbDown },
  { value: 'smile', label: 'Smile', icon: SentimentSatisfied },
  { value: 'frown', label: 'Frown', icon: SentimentDissatisfied },
  { value: 'meh', label: 'Meh', icon: SentimentNeutral },
];

const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange, label = 'Icon' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showGrid, setShowGrid] = useState(false);

  console.log('IconSelector rendered with value:', value);

  const filteredIcons = iconOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedIcon = iconOptions.find(option => option.value === value);
  console.log('Selected icon:', selectedIcon);

  const renderIcon = (iconComponent: any, props?: any) => {
    try {
      return React.createElement(iconComponent, props);
    } catch (error) {
      console.error('Error rendering icon:', error);
      return null;
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.icon : null;
  };

  const SelectedIconComponent = getIconComponent(value);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={label}
          onOpen={() => setShowGrid(true)}
          onClose={() => setShowGrid(false)}
          renderValue={(selected) => (
            <Box display="flex" alignItems="center" gap={1}>
              {SelectedIconComponent && <SelectedIconComponent />}
              <Typography>{selectedIcon?.label || selected || 'Select an icon'}</Typography>
            </Box>
          )}
        >
          <MenuItem value="">
            <em>No icon</em>
          </MenuItem>
          {iconOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <MenuItem key={option.value} value={option.value}>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconComponent />
                  <Typography>{option.label}</Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {showGrid && (
        <Paper sx={{ mt: 2, p: 2, maxHeight: 400, overflow: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 1 }}>
            {filteredIcons.map((option) => {
              const IconComponent = option.icon;
              return (
                <Paper
                  key={option.value}
                  sx={{
                    p: 1,
                    cursor: 'pointer',
                    textAlign: 'center',
                    border: value === option.value ? 2 : 1,
                    borderColor: value === option.value ? 'primary.main' : 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    onChange(option.value);
                    setShowGrid(false);
                  }}
                >
                  <IconComponent sx={{ fontSize: 24, mb: 0.5 }} />
                  <Typography variant="caption" display="block">
                    {option.label}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default IconSelector;
