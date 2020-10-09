case1 = [5, 10, 3]
case2 = [5, 10, 20]


def min_cost(inp):
    odd_toll_cost = 0
    even_toll_cost = inp[0]

    cost = 0
    total_tolls = len(inp)
    last_added_index = -2
    for i in range(total_tolls - 1):
        if i - last_added_index < 1:
            continue
        if inp[i] < inp[i+1]:
            last_added_index = i
            cost += inp[i]
        else:
            last_added_index = i + 1
            cost += inp[i+1]
    print(cost)

min_cost(case1)
min_cost(case2)
