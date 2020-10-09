nums1 = [4, 1, 2]
nums2 = [1, 3, 4, 2]

for i, val in enumerate(nums1):
    max_of_main = max(nums2)
    nums2.remove(max_of_main)
    if max_of_main > nums1[i]:
        nums1[i] = max_of_main
    else:
        nums1[i] = -1

print(nums1)
