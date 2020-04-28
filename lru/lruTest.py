from lru import lru


class lruTest:

    def __init__(self):
        pass

    def testcases(self):
        a = lru(3)
        a.put("google")
        # print(a.get_cache())
        assert a.get_cache() == ['google-www.google.com'],"testcase A failed"
        assert a.get("google") == "www.google.com", "testcase 1 failed"
        print("testcase 1 passed")
        a.put("facebook")
        # print(a.get_cache())
        assert a.get_cache() == ['facebook-www.facebook.com','google-www.google.com'],"testcase B failed"
        assert a.get("facebook") == "www.facebook.com", "testcase 2 failed"
        print("testcase 2 passed")
        a.put("gmail")
        a.put("youtube")
        assert a.get_cache() == ['youtube-www.youtube.com','gmail-www.gmail.com','facebook-www.facebook.com'],"testcase C failed"
        assert a.get("google") == None, "testcase 3 failed"
        print("testcase 3 passed")
        print("All Testcases passed!!")
        lst = a.get_cache()
        for i in lst:
            print(i)


if __name__ == "__main__":
    a = lruTest()
    a.testcases()
