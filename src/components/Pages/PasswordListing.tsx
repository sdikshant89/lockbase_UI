import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRightIcon,
  Calendar,
  ChevronDown,
  Grid2x2,
  List,
  ListFilterPlus,
  Plus,
  Star,
  Tag,
  WandSparkles,
} from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/select';

const FILTERS = ['None', 'Email/ Username', 'Title', 'URL'];

export default function PasswordListingPage() {
  const [filter, setFilter] = React.useState('None');
  return (
    <div className="h-full overflow-auto px-4 py-6">
      <div className="mx-5 w-auto">
        <div className="mb-5 ml-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Secure Vault
          </h1>
          <p className="text-md text-muted-foreground">
            Access and organize your credentials. Effortlessly manage passwords
            for control and compliance.
          </p>
        </div>

        <div>
          {/* Main */}

          <Card className="border-border/60">
            <CardHeader className="flex justify-between align-middle">
              <div>
                <CardTitle>Credential Repository</CardTitle>
                <CardDescription>
                  Browse, filter, and search your stored credentials.
                </CardDescription>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button className="gap-2 bg-green-500 dark:bg-green-600  text-white hover:scale-105 transition-all duration-200">
                  <WandSparkles className="h-4 w-4" /> Generate
                </Button>
                <Button className="gap-2 bg-purple-500 text-white hover:scale-105 transition-all duration-200">
                  <Plus className="h-4 w-4" /> Add Credential
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <ButtonGroup className="flex items-center justify-start">
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
                    <Input placeholder="Search" className="min-w-lg" />
                  </ButtonGroup>

                  <ButtonGroup>
                    <Button
                      variant="secondary"
                      className="gap-2 hover:shadow-purple-400/70  hover:shadow-lg dark:text-white text-black hover:scale-105 transition-all duration-200"
                    >
                      Search <ArrowRightIcon />
                    </Button>
                  </ButtonGroup>
                </ButtonGroup>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="secondary" className="gap-2">
                    <List /> List
                  </Button>
                  <Button variant="secondary" className="gap-2">
                    <Grid2x2 /> Grid
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-start gap-4 mt-4">
                <Button variant="secondary" className="gap-2">
                  <Star /> Favourites
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Tag /> Tags <ChevronDown />
                </Button>
                <Button variant="secondary" className="gap-2">
                  <ListFilterPlus /> Categories <ChevronDown />
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Calendar /> Last Updated
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
