from django.contrib import admin

# Register your models here.


from store.models import (Product,
                          Cart,
                          Order,
                          OrderItem,
                          CartItem)


admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(CartItem)