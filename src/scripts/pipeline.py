import sys

n = len(sys.argv)
print("Total arguments passed:", n)

for i in range(0,n):
    print(sys.argv[i])