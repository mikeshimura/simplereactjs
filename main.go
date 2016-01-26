package main

import (
	"fmt"
	"github.com/zenazn/goji"
	"github.com/zenazn/goji/web"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"encoding/json"
)

var Path = ""

func main() {
	Path, _ := filepath.Abs(".")
	fmt.Println(Path)
	static := web.New()
	publicPath := Path + string(os.PathSeparator) + "assets"
	static.Get("/assets/*", http.StripPrefix("/assets/", http.FileServer(http.Dir(publicPath))))
	http.Handle("/assets/", static)
	goji.Get("/", showPages)
	goji.Post("/dataget", dataGet)
	goji.Serve()

}
func showPages(c web.C, w http.ResponseWriter, r *http.Request) {
	if Path == "" {
		Path, _ = filepath.Abs(".")
		fmt.Printf("Path get %v\n", Path)
	}
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "text/html")
	buf, _ := ioutil.ReadFile(Path + string(os.PathSeparator) + "index.html")
	io.WriteString(w, string(buf))
}
func dataGet(c web.C, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("dataGet\n")
	w.Header().Set("Content-Type", "text/json")
	res:=make([]map[string]interface{},0)
	map1:=make(map[string]interface{})
	map1["id"]=1
	map1["name"]="山田太郎"
	map1["mail"]="taro.yamada@example.net"
	map1["action"]=true
	map1["cat"]="1"
	res=append(res,map1)
	map2:=make(map[string]interface{})
	map2["id"]=2
	map2["name"]="東京花子"
	map2["mail"]="hanako.tokyo@example.net"
	map2["action"]=false
	map2["cat"]="2"
	res=append(res,map2)
	err:=json.NewEncoder(w).Encode(res)
	if err!=nil{
		panic("Encode error")
	}

}