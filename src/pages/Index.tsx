import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
}

interface Order {
  id: string;
  service: string;
  link: string;
  quantity: number;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

const services: Service[] = [
  { id: 'followers', name: 'Подписчики', icon: 'Users', price: 0.5, description: 'Быстрая накрутка подписчиков' },
  { id: 'likes', name: 'Лайки', icon: 'Heart', price: 0.3, description: 'Увеличение лайков на постах' },
  { id: 'views', name: 'Просмотры', icon: 'Eye', price: 0.2, description: 'Накрутка просмотров видео' },
  { id: 'comments', name: 'Комментарии', icon: 'MessageSquare', price: 1.0, description: 'Качественные комментарии' },
];

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', service: 'Подписчики', link: 'https://instagram.com/user1', quantity: 500, status: 'completed', progress: 100 },
    { id: '2', service: 'Лайки', link: 'https://instagram.com/post/abc', quantity: 1000, status: 'processing', progress: 65 },
    { id: '3', service: 'Просмотры', link: 'https://youtube.com/watch?v=xyz', quantity: 2000, status: 'pending', progress: 0 },
  ]);
  const { toast } = useToast();

  const handleOrder = () => {
    if (!selectedService || !link) {
      toast({
        title: 'Ошибка',
        description: 'Выберите услугу и укажите ссылку',
        variant: 'destructive',
      });
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      service: selectedService.name,
      link,
      quantity,
      status: 'pending',
      progress: 0,
    };

    setOrders([newOrder, ...orders]);
    setLink('');
    setQuantity(100);
    setSelectedService(null);

    toast({
      title: 'Заказ создан!',
      description: `${selectedService.name} - ${quantity} шт.`,
    });
  };

  const totalPrice = selectedService ? (selectedService.price * quantity).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="gradient-primary text-transparent bg-clip-text">
              <h1 className="text-6xl font-heading font-bold mb-2">BoostMax</h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">Профессиональная накрутка социальных сетей</p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Icon name="Zap" size={16} className="mr-2" />
              Быстро
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Icon name="Shield" size={16} className="mr-2" />
              Безопасно
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Эффективно
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-scale-in">
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
                <Icon name="Sparkles" size={28} className="mr-3 text-primary" />
                Выберите услугу
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <Card
                    key={service.id}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      selectedService?.id === service.id
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        selectedService?.id === service.id ? 'gradient-primary' : 'bg-muted'
                      }`}>
                        <Icon
                          name={service.icon as any}
                          size={28}
                          className={selectedService?.id === service.id ? 'text-white' : 'text-foreground'}
                        />
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {service.price}₽ / шт
                      </Badge>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {selectedService && (
              <Card className="p-8 animate-scale-in">
                <h3 className="text-2xl font-heading font-bold mb-6">Оформление заказа</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="link" className="text-base mb-2 block">
                      Ссылка на профиль или пост
                    </Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://instagram.com/username"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="text-base h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-base mb-2 block">
                      Количество: {quantity}
                    </Label>
                    <Input
                      id="quantity"
                      type="range"
                      min="10"
                      max="10000"
                      step="10"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>10</span>
                      <span>10000</span>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium">Итого:</span>
                      <span className="font-heading font-bold text-2xl gradient-primary text-transparent bg-clip-text">
                        {totalPrice} ₽
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleOrder}
                    size="lg"
                    className="w-full text-lg h-14 gradient-primary hover:opacity-90 transition-opacity"
                  >
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Запустить накрутку
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8 animate-scale-in">
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                <Icon name="History" size={24} className="mr-2 text-primary" />
                История заказов
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{order.service}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {order.link}
                        </p>
                      </div>
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'processing'
                            ? 'secondary'
                            : 'outline'
                        }
                        className={
                          order.status === 'completed'
                            ? 'bg-green-500'
                            : order.status === 'processing'
                            ? 'gradient-secondary text-white'
                            : ''
                        }
                      >
                        {order.status === 'completed'
                          ? 'Готово'
                          : order.status === 'processing'
                          ? 'В работе'
                          : 'Ожидает'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{order.quantity} шт</span>
                      <span className="font-medium">{order.progress}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-2">
                      <div
                        className="gradient-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow animate-fade-in">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
              <Icon name="Clock" size={32} className="text-white" />
            </div>
            <h4 className="font-heading font-bold text-xl mb-2">Мгновенный старт</h4>
            <p className="text-muted-foreground">Заказы начинают выполняться через 1-5 минут</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '500ms' }}>
              <Icon name="Target" size={32} className="text-white" />
            </div>
            <h4 className="font-heading font-bold text-xl mb-2">Высокое качество</h4>
            <p className="text-muted-foreground">Живые аккаунты с активностью и профилями</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1000ms' }}>
              <Icon name="Headphones" size={32} className="text-white" />
            </div>
            <h4 className="font-heading font-bold text-xl mb-2">Поддержка 24/7</h4>
            <p className="text-muted-foreground">Всегда готовы помочь и ответить на вопросы</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
