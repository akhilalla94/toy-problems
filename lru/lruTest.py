from lru import lru


class lruTEST:

    def __init__(self):
        pass

    def testcases(self):
        a = lru(3, "found")
        a.put("google")
        assert a.get("google") == "found", "Not found"
        a.put("facebook")
        assert a.get("facebook") == "found", "Not found"
        a.put("gmail")
        a.put("youtube")
        assert a.get("google") == None, "Not found"
        assert a.get_cache() == {"youtube": "found",
                                 "gmail": "found", "facebook": "found"}


if __name__ == "__main__":
    a = lruTEST()
    a.testcases()
