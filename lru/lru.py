class lru:

    def __init__(self, size):
        self.size = size
        self.lru = []
        self.lruCache = {}

    def get(self, key, default=None):
        if key in self.lru:
            return self.lruCache[key]
        else:
            return default

    def put(self, key):

        if(len(self.lru) < self.size):
            if key in self.lru:
                self.lru.remove(key)
                self.lru.append(key)
                self.lruCache[key] = "www."+str(key)+".com"
            else:
                self.lru.append(key)
                self.lruCache[key] = "www."+str(key)+".com"
        else:

            var = self.lru.pop(0)
            self.lru.append(key)
            del self.lruCache[var]
            self.lruCache[key] = "www."+str(key)+".com"

    def get_cache(self):
        ls = []
        for key in reversed(self.lru):
            ls.append(key+"-" + self.lruCache[key])
        return ls
