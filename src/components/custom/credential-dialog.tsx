// src/components/custom/credential-dialog.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Category,
  CredentialFormValues,
  SecretType,
  Tag,
} from '@/types/passwordVaultTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Eye, EyeOff, Plus, WandSparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Utility functions
function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function parseTagsFromPaste(pasted: string): string[] {
  return pasted
    .split(',')
    .map((t) => normalizeTag(t))
    .filter(Boolean);
}

// Secret types
const secretTypes: SecretType[] = ['password', 'pin', 'api_key', 'other'];

// Zod validation schema
const credentialSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    username: z
      .string()
      .optional()
      .refine(
        (val) => !val || !val.includes('@') || /^[^@]+@[^@]+\.[^@]+$/.test(val),
        {
          message: 'Invalid email format',
        },
      ),
    websiteName: z.string().min(2, 'Website name required'),
    url: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
        message: 'Invalid URL',
      }),
    secretType: z.enum(['password', 'pin', 'api_key', 'other'] as const),
    secretValue: z.string().min(1, 'Secret value required'),
    favorite: z.boolean(),
    category: z.any().optional(),
    tags: z.array(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    // PIN validation: 4-12 digits
    if (data.secretType === 'pin') {
      if (!/^\d{4,12}$/.test(data.secretValue)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['secretValue'],
          message: 'PIN must be 4-12 digits',
        });
      }
    }
    // Password/API Key validation: min 4 chars
    if (data.secretType === 'password' || data.secretType === 'api_key') {
      if (data.secretValue.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['secretValue'],
          message: 'Must be at least 4 characters',
        });
      }
    }
  });

// Component props interface
interface CredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  initialValues?: CredentialFormValues;
  categories: Category[];
  tags: Tag[];
  onSubmit: (values: CredentialFormValues) => void;
}

export const CredentialDialog: React.FC<CredentialDialogProps> = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  categories,
  onSubmit,
}) => {
  const [showSecret, setShowSecret] = useState(false);
  const [localCategories, setLocalCategories] = useState(categories);
  const [newCategory, setNewCategory] = useState('');

  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialValues?.tags || [],
  );
  const [loading, setLoading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const form = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
    defaultValues: initialValues || {
      title: '',
      username: '',
      websiteName: '',
      url: '',
      secretType: 'password',
      secretValue: '',
      favorite: false,
      category: undefined,
      tags: [],
    },
  });

  // Handle tag input
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (!tagInput.trim()) return;
    const normalized = normalizeTag(tagInput);
    const exists = selectedTags.some((t) => t.id === normalized);
    if (!exists) {
      const tagObj = { id: normalized, name: normalized };
      setSelectedTags([...selectedTags, tagObj]);
    }
    setTagInput('');
  };

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleTagPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedTags = parseTagsFromPaste(e.clipboardData.getData('text'));
    const newTags = pastedTags
      .filter((t) => !selectedTags.some((existing) => existing.id === t))
      .map((t) => ({ id: t, name: t }));
    setSelectedTags([...selectedTags, ...newTags]);
    setTagInput('');
  };

  // Handle category creation
  const handleCategoryCreate = () => {
    if (!newCategory.trim()) return;
    const newCat = { id: newCategory, name: newCategory };
    setLocalCategories([...localCategories, newCat]);
    form.setValue('category', newCat);
    setNewCategory('');
  };

  // Secret value copy with feedback
  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(form.getValues('secretValue'));
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Submit
  const handleSubmit = async (values: CredentialFormValues) => {
    setLoading(true);
    try {
      values.tags = selectedTags;
      values.category = form.getValues('category');
      console.log('Submitting credential:', values);
      onSubmit(values);
      // Reset form on successful submission
      form.reset();
      setSelectedTags([]);
      setTagInput('');
      setShowSecret(false);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const getSecretLabel = () => {
    const type = form.watch('secretType');
    switch (type) {
      case 'pin':
        return 'PIN';
      case 'password':
        return 'Password';
      case 'api_key':
        return 'API Key';
      default:
        return 'Secret Value';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold">
            {mode === 'add' ? 'Add Credential' : 'Edit Credential'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Securely store a new credential in your vault.'
              : 'Update your credential details.'}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Details Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title / Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Gmail Account"
                          {...field}
                          disabled={loading}
                          autoFocus
                          className="dark:bg-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username / Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., user@example.com"
                          {...field}
                          disabled={loading}
                          className="dark:bg-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Gmail"
                          {...field}
                          disabled={loading}
                          className="dark:bg-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          disabled={loading}
                          className="dark:bg-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Security Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Security
              </h3>

              <div className="flex gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="secretType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Secret Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-32 dark:bg-zinc-800">
                            {field.value === 'api_key'
                              ? 'API Key'
                              : field.value.charAt(0).toUpperCase() +
                                field.value.slice(1)}
                          </SelectTrigger>
                          <SelectContent className="dark:bg-zinc-900">
                            {secretTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type === 'api_key'
                                  ? 'API Key'
                                  : type.charAt(0).toUpperCase() +
                                    type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secretValue"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>{getSecretLabel()}</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            type={showSecret ? 'text' : 'password'}
                            placeholder={`Enter ${getSecretLabel().toLowerCase()}`}
                            {...field}
                            disabled={loading}
                            className="flex-1 dark:bg-zinc-800"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={
                              showSecret ? 'Hide secret' : 'Show secret'
                            }
                            onClick={() => setShowSecret(!showSecret)}
                            type="button"
                            className="hover:bg-gray-200 dark:hover:bg-zinc-700 flex-shrink-0"
                          >
                            {showSecret ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Copy secret to clipboard"
                            onClick={handleCopySecret}
                            type="button"
                            className={cn(
                              'transition-colors flex-shrink-0',
                              copyFeedback
                                ? 'bg-green-200 dark:bg-green-900'
                                : 'hover:bg-gray-200 dark:hover:bg-zinc-700',
                            )}
                            title={copyFeedback ? 'Copied!' : 'Copy'}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {form.watch('secretType') === 'password' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Generate random password"
                              type="button"
                              onClick={() => {
                                const generated =
                                  Math.random().toString(36).slice(2, 14) +
                                  Math.random()
                                    .toString(36)
                                    .slice(2, 5)
                                    .toUpperCase();
                                form.setValue('secretValue', generated);
                              }}
                              className="hover:bg-gray-200 dark:hover:bg-zinc-700 flex-shrink-0"
                            >
                              <WandSparkles className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Organization Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Organization
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.id || ''}
                          onValueChange={(val) => {
                            if (val === 'new') {
                              form.setValue('category', {
                                id: 'new',
                                name: '',
                              });
                            } else {
                              const cat = localCategories.find(
                                (c) => c.id === val,
                              );
                              if (cat) form.setValue('category', cat);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full dark:bg-zinc-800">
                            {field.value?.name || 'Select category'}
                          </SelectTrigger>
                          <SelectContent className="dark:bg-zinc-900">
                            {localCategories.length > 0 && (
                              <>
                                {localCategories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                            <SelectItem
                              value="new"
                              className="text-blue-600 dark:text-blue-400"
                            >
                              <span className="flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Create new…
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('category')?.id === 'new' && (
                  <div className="flex gap-2 items-end">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category name"
                      className="flex-1 dark:bg-zinc-800"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCategoryCreate}
                      type="button"
                      disabled={!newCategory.trim()}
                    >
                      Add
                    </Button>
                  </div>
                )}

                {/* Tags Section */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-3 min-h-8">
                        {selectedTags.length > 0 ? (
                          selectedTags.map((tag) => (
                            <span
                              key={tag.id}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200"
                            >
                              {tag.name}
                              <button
                                type="button"
                                aria-label={`Remove tag: ${tag.name}`}
                                className="ml-1 text-blue-600 dark:text-blue-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                onClick={() => handleTagRemove(tag.id)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            No tags added yet
                          </p>
                        )}
                      </div>
                      <FormControl>
                        <div className="flex gap-2 items-center">
                          <Input
                            value={tagInput}
                            onChange={handleTagInput}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleTagAdd();
                              } else if (
                                e.key === 'Backspace' &&
                                !tagInput &&
                                selectedTags.length > 0
                              ) {
                                handleTagRemove(
                                  selectedTags[selectedTags.length - 1].id,
                                );
                              }
                            }}
                            onPaste={handleTagPaste}
                            placeholder="Add tag (enter or paste comma-separated)"
                            disabled={loading}
                            className="flex-1 dark:bg-zinc-800"
                          />
                          <Button
                            variant="secondary"
                            className="py-5"
                            onClick={handleTagAdd}
                            type="button"
                            disabled={!tagInput.trim() || loading}
                          >
                            Add
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                disabled={loading}
                onClick={() => {
                  form.reset();
                  setSelectedTags([]);
                  setTagInput('');
                  setShowSecret(false);
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading
                  ? 'Saving...'
                  : mode === 'add'
                    ? 'Save Credential'
                    : 'Update Credential'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CredentialDialog;
