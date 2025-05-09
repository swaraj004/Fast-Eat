
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { CircleDot, PenLine, Plus, Trash2 } from 'lucide-react';
import { FoodItemProps } from '@/components/food/FoodItemCard';
import { toast } from 'sonner';

// Mock categories
const categories = ['Burgers', 'Sides', 'Beverages', 'Desserts'];

// Mock menu items
const mockMenuItems: (FoodItemProps & { available: boolean })[] = [
  {
    id: '101',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899',
    isVeg: false,
    category: 'burgers',
    available: true
  },
  {
    id: '102',
    name: 'Double Bacon Burger',
    description: 'Two beef patties with bacon strips, cheese, pickles, and smoky BBQ sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1776',
    isVeg: false,
    isSpicy: true,
    category: 'burgers',
    available: true
  },
  {
    id: '103',
    name: 'Veggie Supreme Burger',
    description: 'Plant-based patty with fresh avocado, crisp lettuce, tomato, and vegan mayo',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=1854',
    isVeg: true,
    category: 'burgers',
    available: false
  },
  {
    id: '201',
    name: 'Crispy Fries',
    description: 'Golden crispy fries seasoned with our special herb blend',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1576777645402-fbc0010c1254?q=80&w=1770',
    isVeg: true,
    category: 'sides',
    available: true
  },
  {
    id: '202',
    name: 'Cheesy Bacon Fries',
    description: 'Crispy fries topped with melted cheese and bacon bits',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1770',
    isVeg: false,
    category: 'sides',
    available: true
  },
  {
    id: '301',
    name: 'Chocolate Milkshake',
    description: 'Creamy milkshake made with premium chocolate ice cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1578313611104-fa4d12dfc9fb?q=80&w=1770',
    isVeg: true,
    category: 'beverages',
    available: true
  }
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter items based on active category
  const filteredItems = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab.toLowerCase());

  const toggleItemAvailability = (id: string) => {
    setMenuItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
    
    const item = menuItems.find(item => item.id === id);
    if (item) {
      toast.success(`${item.name} is now ${!item.available ? 'available' : 'unavailable'}`);
    }
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-brand hover:bg-brand-dark">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Item name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Item description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  placeholder="0.00"
                  type="number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm col-span-3"
                >
                  {categories.map(category => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isVeg" className="text-right">
                  Vegetarian
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="isVeg" />
                  <Label htmlFor="isVeg">Is vegetarian</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isSpicy" className="text-right">
                  Spicy
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="isSpicy" />
                  <Label htmlFor="isSpicy">Is spicy</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="image" className="text-right pt-2">
                  Image
                </Label>
                <div className="col-span-3">
                  <Input
                    id="image"
                    type="file"
                    className="col-span-3"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a square image for best results
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-brand hover:bg-brand-dark"
                onClick={() => {
                  setIsDialogOpen(false);
                  toast.success("New menu item added successfully!");
                }}
              >
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Items</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white border rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <CircleDot 
                              className={`h-4 w-4 ${item.isVeg ? 'text-food-vegetarian' : 'text-food-nonVegetarian'}`} 
                              fill={item.isVeg ? '#4CAF50' : '#E53935'} 
                            />
                            <span className="text-xs text-muted-foreground">
                              {item.isVeg ? 'Veg' : 'Non-veg'}
                            </span>
                            {item.isSpicy && (
                              <span className="text-xs text-orange-500 ml-2">• Spicy</span>
                            )}
                          </div>
                          
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground truncate max-w-lg">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                          <Badge 
                            variant="outline" 
                            className={item.available ? 'text-green-600' : 'text-red-500'}
                          >
                            {item.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t">
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">Availability:</span>
                          <Switch 
                            checked={item.available} 
                            onCheckedChange={() => toggleItemAvailability(item.id)}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <PenLine className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
