<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        $books = Book::all();
        //return response()->json(["data"=>$books,"success"=>true]);
        //o tren la angular, duoi la ajax
        return response()->json($books);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $data = $request->only('title','code','author');
        $book = Book::create($data);
        return response()->json(["data"=>$book,"success"=>true]);
    }


    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json(["data"=>$book]);
    }


    public function edit($id)
    {
        $book = Book::findOrFail($id);
        return response()->json(["data"=>$book,"success"=>true]);
    }


    public function update(Request $request,$id)
    {
      $data = $request->only('title','code','author');
      $book = Book::findOrFail($id);
      $book->update($data);
      return response()->json(["data"=>$book,"success"=>true]);
    }


    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(["success"=>true]);
    }

    public function search(Request $request) {
        $keyword = $request->keyword;
        $books = Book::where('title', 'LIKE', '%' . $keyword . '%')->get();
        $data = [
            'status' => 'success',
            'data' => $books
        ];
        return response()->json($data);
    }
}
