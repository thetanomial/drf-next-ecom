from rest_framework import viewsets,status
from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Cart
from rest_framework import viewsets, status, mixins

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that the view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only require IsAuthenticated for POST, PUT, and DELETE actions
            return [IsAuthenticated()]
        return []

class CartViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    # Add a custom action to view cart items
    @action(detail=True, methods=['get'])
    def view_cart(self, request, pk=None):
        cart = self.get_object()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='remove-from-cart')
    def remove_from_cart(self, request):
        product_id = request.data.get('product_id')


        if not product_id:
            return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure session exists
        session_id = request.session.session_key
        print("session id: ",session_id)
        if not session_id:
            return Response({"error": "Session not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Get the user's cart
        cart = get_object_or_404(Cart, session_id=session_id)

        try:
            # Find and delete the cart item
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='decrement-from-cart')
    def decrement_from_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        session_id = request.session.session_key
        if not session_id:
            return Response({"error": "Session not found."}, status=status.HTTP_400_BAD_REQUEST)

        print(session_id)
        cart = get_object_or_404(Cart, session_id=session_id)


        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            
            # If quantity becomes 1, remove the item from the cart
            if cart_item.quantity <= quantity:
                cart_item.delete()
                return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
            else:
                cart_item.quantity -= quantity
                cart_item.save()
                return Response({"message": "Item quantity decremented."}, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure session exists
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key

        # Get or create the cart using the session ID
        cart, _ = Cart.objects.get_or_create(session_id=session_id)

        # Get the product
        product = get_object_or_404(Product, id=product_id)

        # Get or create the cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        # Return the updated cart
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data, status=status.HTTP_201_CREATED)

class OrderViewSet(mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only show orders belonging to the authenticated user
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        session_id = request.session.session_key
        if not session_id:
            return Response({"error": "Session not found."}, status=status.HTTP_400_BAD_REQUEST)

        cart = Cart.objects.filter(session_id=session_id).first()

        if request.user.is_authenticated:
            if cart:
                cart.user = request.user
                cart.save()
            else:
                cart, _ = Cart.objects.get_or_create(user=request.user, session_id=session_id)
        else:
            if not cart:
                cart, _ = Cart.objects.get_or_create(session_id=session_id)

        if not cart or not cart.items.exists():
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        total_price = sum(item.get_total_price() for item in cart.items.all())

        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            total_price=total_price,
            session_id=session_id,
            is_paid=False
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity
            )

        cart.items.all().delete()

        order_serializer = OrderSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)
    

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
