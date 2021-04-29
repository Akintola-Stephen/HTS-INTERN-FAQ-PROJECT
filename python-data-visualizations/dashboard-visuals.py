import pandas as pd
import seaborn as sns
sns.set()
import matplotlib.pyplot as plt

x = pd.Series([1, 2, 3])
y = pd.Series([2, 8, 4])
fig, ax = plt.subplots()
#s.plot.bar()
plt.figure(figsize=(6, 3))
plt.plot(x, y)
fig.savefig('my_plot.png')
