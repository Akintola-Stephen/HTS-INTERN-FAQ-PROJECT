import pandas as pd
import seaborn as sns
# sns.set()
import matplotlib.pyplot as plt

s = pd.Series([1, 2, 3])
fig, ax = plt.subplots()
#s.plot.bar()
sns.histplot(s)
fig.savefig('my_plot.png')
