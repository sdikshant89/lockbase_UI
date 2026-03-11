// src/components/custom/collection-dialog.tsx
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CollectionFormValues } from '@/types/passwordVaultTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Briefcase,
  ChevronDown,
  Cloud,
  CreditCard,
  Database,
  Folder,
  Globe,
  Key,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  User,
  Wallet,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

const COLLECTION_ICONS = [
  { name: 'Work', icon: Briefcase, id: 'work' },
  { name: 'Personal', icon: User, id: 'personal' },
  { name: 'Finance', icon: Wallet, id: 'finance' },
  { name: 'Payments', icon: CreditCard, id: 'payments' },
  { name: 'Security', icon: ShieldCheck, id: 'security' },
  { name: 'Keys', icon: Key, id: 'keys' },
  { name: 'Websites', icon: Globe, id: 'websites' },
  { name: 'Servers', icon: Server, id: 'servers' },
  { name: 'Database', icon: Database, id: 'database' },
  { name: 'Devices', icon: Smartphone, id: 'devices' },
  { name: 'Cloud', icon: Cloud, id: 'cloud' },
  { name: 'General', icon: Folder, id: 'general' },
];

const collectionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Please select an icon'),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color format'),
});

interface CollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  initialValues?: CollectionFormValues;
  onSubmit: (values: CollectionFormValues) => void;
}

export const CollectionDialog: React.FC<CollectionDialogProps> = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}) => {
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialValues || {
      name: '',
      description: '',
      icon: 'work',
      color: '#3b82f6',
    },
  });

  const watchedIcon = form.watch('icon');
  const watchedColor = form.watch('color');

  const filteredIcons = useMemo(() => {
    if (!iconSearchQuery) return COLLECTION_ICONS;
    return COLLECTION_ICONS.filter((icon) =>
      icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase()),
    );
  }, [iconSearchQuery]);

  const selectedIconData = COLLECTION_ICONS.find(
    (icon) => icon.id === watchedIcon,
  );
  const SelectedIconComponent = selectedIconData?.icon;

  const handleSubmit = async (values: CollectionFormValues) => {
    setLoading(true);
    try {
      onSubmit(values);
      form.reset();
      setIconSearchQuery('');
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    form.reset({
      name: '',
      description: '',
      icon: 'work',
      color: '#3b82f6',
    });
    setIconSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-2xl max-h-fit overflow-hidden border border-border/60 bg-background p-0 shadow-2xl">
        <DialogHeader className="border-b border-border/60 px-6 pt-5 pb-2">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {mode === 'add' ? 'Create Collection' : 'Edit Collection'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mode === 'add'
              ? 'Create a new collection to organize related credentials.'
              : 'Update your collection details and appearance.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid items-stretch gap-4 p-6 pt-3 md:grid-cols-[250px_1fr]">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium">
                        Select Icon
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              disabled={loading}
                              className={cn(
                                'w-full rounded-2xl border bg-background p-3 transition-all',
                                ' hover:bg-accent/20',
                                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                loading && 'cursor-not-allowed opacity-60',
                              )}
                            >
                              <div className="flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-3xl transition-all">
                                  {SelectedIconComponent ? (
                                    <SelectedIconComponent
                                      className="h-16 w-16"
                                      style={{ color: watchedColor }}
                                    />
                                  ) : null}
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">
                                    Click to select icon
                                  </span>
                                </div>
                              </div>
                            </button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="center"
                            className="w-[280px] rounded-2xl p-0"
                          >
                            <div className="border-b border-border/60 p-3">
                              <div className="flex items-center gap-2 rounded-xl border border-border/60 dark:bg-black bg-muted px-3 py-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <input
                                  placeholder="Search icons..."
                                  value={iconSearchQuery}
                                  onChange={(e) =>
                                    setIconSearchQuery(e.target.value)
                                  }
                                  disabled={loading}
                                  className="w-full text-sm outline-none placeholder:text-muted-foreground"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 p-3">
                              {filteredIcons.length > 0 ? (
                                filteredIcons.map((iconItem) => {
                                  const Icon = iconItem.icon;
                                  const isSelected =
                                    field.value === iconItem.id;

                                  return (
                                    <button
                                      key={iconItem.id}
                                      type="button"
                                      disabled={loading}
                                      onClick={() =>
                                        field.onChange(iconItem.id)
                                      }
                                      className={cn(
                                        'group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all',
                                        isSelected
                                          ? 'border-primary bg-primary/8 shadow-sm'
                                          : 'bg-muted dark:bg-black hover:border-primary/40 hover:bg-accent/30',
                                      )}
                                      title={iconItem.name}
                                    >
                                      <div className="flex items-center justify-center rounded-xl transition-all">
                                        <Icon
                                          className="h-7 w-7"
                                          style={
                                            isSelected
                                              ? { color: watchedColor }
                                              : undefined
                                          }
                                        />
                                      </div>
                                    </button>
                                  );
                                })
                              ) : (
                                <p className="col-span-4 py-6 text-center text-sm text-muted-foreground">
                                  No icons found
                                </p>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color Selector */}
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Color
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={loading}
                              className="h-14 w-full justify-between rounded-xl border-border/60 bg-background px-4 shadow-sm hover:bg-accent/40"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                                  <div
                                    className="h-5 w-5 rounded-md"
                                    style={{ backgroundColor: field.value }}
                                  />
                                </div>

                                <div className="flex flex-col items-start">
                                  <span className="text-sm font-medium">
                                    Accent Color
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {field.value.toUpperCase()}
                                  </span>
                                </div>
                              </div>

                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="center"
                            className="rounded-2xl py-3"
                          >
                            <div>
                              <div className="rounded-xl p-3">
                                <CirclePicker
                                  color={field.value}
                                  onChangeComplete={(color) =>
                                    field.onChange(color.hex)
                                  }
                                  circleSize={28}
                                />
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Form Section */}

              <div className="flex h-full flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Collection Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoFocus
                          disabled={loading}
                          placeholder="e.g. Work Passwords"
                          className="bg-transparent dark:bg-input/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={loading}
                          placeholder="Add a description (Optional)"
                          className="h-full min-h-[8.5rem] resize-none bg-transparent dark:bg-input/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="border-t border-border/60 px-6 py-4">
              <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={loading}
                  onClick={handleClear}
                  className="gap-2 dark:text-white hover:scale-105 transition-all duration-200 w-full sm:w-auto text-xs sm:text-sm"
                >
                  Clear
                </Button>

                <Button
                  type="submit"
                  variant="secondary"
                  disabled={loading}
                  className="gap-2 bg-purple-500 text-white transition-all duration-200 w-full sm:w-auto text-xs sm:text-sm"
                >
                  {loading
                    ? 'Saving...'
                    : mode === 'add'
                      ? 'Create Collection'
                      : 'Update Collection'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionDialog;
