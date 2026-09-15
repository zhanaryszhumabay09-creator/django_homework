@api_view(["GET"])
def users_list(request):
    search = request.GET.get("search", "")
    email = request.GET.get("email", "")

    users = User.objects.all()

    if search:
        users = users.filter(username__icontains=search)

    if email:
        users = users.filter(email__icontains=email)

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)