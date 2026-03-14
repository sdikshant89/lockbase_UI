import { CollectionFormValues } from '@/types/passwordVaultTypes';
import {
  ArrowDownUp,
  ArrowRightIcon,
  ChevronDown,
  Grid2x2,
  Layers2,
  List,
  Plus,
} from 'lucide-react';
import React from 'react';
import CollectionDialog from '../custom/collection-dialog';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/select';

const FILTERS = ['Title', 'Description'];

export default function ManageCollectionsPage() {
  const [filter, setFilter] = React.useState('Title');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit'>('add');

  const handleAddCollection = () => {
    setDialogMode('add');
    setDialogOpen(true);
  };

  const handleCollectionSubmit = (values: CollectionFormValues) => {
    console.log('Collection submitted:', values);
    // TODO: Add backend call here
  };
  return (
    <div className="h-full overflow-auto px-4 py-6">
      <div className="mx-5 w-auto">
        <div className="flex justify-between items-center pr-6">
          <div className="mb-5 ml-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Manage Collections
            </h1>
            <p className="text-md text-muted-foreground">
              Create and organize collections to group related credentials.
              Manage your vault with ease by categorizing credentials.
            </p>
          </div>
          <Button
            size="sm"
            className="gap-2 bg-purple-500 text-white hover:scale-105 transition-all duration-200 w-full sm:w-auto text-xs sm:text-sm"
            onClick={handleAddCollection}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> Add Collection
          </Button>
        </div>

        <div>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-2">
                  <Button variant="secondary" className="gap-2">
                    <ArrowDownUp /> Sort By <ChevronDown />
                  </Button>
                  <ButtonGroup>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-28">{filter}</SelectTrigger>
                      <SelectContent className="dark:bg-black">
                        <SelectGroup>
                          {FILTERS.map((filter, index) => (
                            <SelectItem
                              key={index}
                              value={filter}
                              className="text-black dark:text-white dark:hover:bg-gray-700/50 hover:bg-gray-200/50"
                            >
                              {filter}{' '}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Filter by Search"
                      className="min-w-lg"
                    />
                  </ButtonGroup>

                  <ButtonGroup>
                    <Button
                      variant="secondary"
                      className="gap-2 hover:shadow-purple-400/70  hover:shadow-lg dark:text-white text-black hover:scale-105 transition-all duration-200"
                    >
                      Search <ArrowRightIcon />
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline">Clear Filter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mx-4 my-6 flex items-center justify-between">
            <div className="flex items-center justify-start gap-2 font-medium text-md">
              <Layers2 className="h-5 w-5" />
              Collections
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                className="gap-2 border-2 border-muted-foreground/40"
              >
                <List /> List
              </Button>
              <Button
                variant="secondary"
                className="gap-2 border-2 border-muted-foreground/40"
              >
                <Grid2x2 /> Grid
              </Button>
            </div>
          </div>

          {/* Collection Dialog */}
          <CollectionDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            mode={dialogMode}
            onSubmit={handleCollectionSubmit}
          />
        </div>
      </div>
    </div>
  );
}
