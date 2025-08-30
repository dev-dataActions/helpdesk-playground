import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Search, Eye, ThumbsUp, Link, Plus, Save, Globe, FileText, TrendingUp } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "How to Process Refunds",
    category: "Payments",
    views: 1247,
    helpful: 89,
    macros: 12,
    status: "Published",
  },
  {
    id: 2,
    title: "Payment Declined Troubleshooting",
    category: "Payments",
    views: 2156,
    helpful: 145,
    macros: 8,
    status: "Published",
  },
  {
    id: 3,
    title: "Shipping Policy Updates",
    category: "Shipping",
    views: 567,
    helpful: 34,
    macros: 3,
    status: "Draft",
  },
  {
    id: 4,
    title: "Account Recovery Steps",
    category: "General Support",
    views: 3421,
    helpful: 287,
    macros: 15,
    status: "Published",
  },
  {
    id: 5,
    title: "Billing Cycle Explanation",
    category: "Payments",
    views: 892,
    helpful: 67,
    macros: 6,
    status: "Published",
  },
];

const categories = ["Payments", "Refunds", "Shipping", "General Support", "Technical", "Billing"];

const suggestedArticles = [
  { topic: "Payment declined error", conversations: 23, avgCsat: 2.1 },
  { topic: "Two-factor authentication setup", conversations: 18, avgCsat: 2.3 },
  { topic: "Subscription cancellation process", conversations: 15, avgCsat: 2.8 },
  { topic: "International shipping delays", conversations: 12, avgCsat: 2.5 },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articleTags, setArticleTags] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleStatus, setArticleStatus] = useState("draft");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Payments":
        return "💳";
      case "Refunds":
        return "↩️";
      case "Shipping":
        return "📦";
      case "General Support":
        return "🛠️";
      case "Technical":
        return "⚙️";
      case "Billing":
        return "💰";
      default:
        return "📄";
    }
  };

  const startNewArticle = () => {
    setSelectedArticle(null);
    setEditMode(true);
    setArticleTitle("");
    setArticleCategory("");
    setArticleTags("");
    setArticleBody("");
    setArticleStatus("draft");
  };

  const editArticle = (article) => {
    setSelectedArticle(article);
    setEditMode(true);
    setArticleTitle(article.title);
    setArticleCategory(article.category);
    setArticleTags("");
    setArticleBody("Sample article content...");
    setArticleStatus(article.status.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Knowledge Base Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage FAQ articles and documentation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button onClick={startNewArticle}>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Column - Articles List */}
        <div className="w-80 border-r bg-card overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {getCategoryIcon(category)} {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedArticle?.id === article.id ? "ring-2 ring-primary bg-muted/30" : ""
                  }`}
                  onClick={() => editArticle(article)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground line-clamp-2">{article.title}</h4>
                    <Badge variant={article.status === "Published" ? "default" : "secondary"} className="text-xs">
                      {article.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {getCategoryIcon(article.category)} {article.category}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {article.helpful}
                    </div>
                    <div className="flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      {article.macros}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Article Editor */}
        <div className="flex-1 flex flex-col">
          {editMode ? (
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-foreground">
                  {selectedArticle ? "Edit Article" : "Create New Article"}
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button>
                    <Globe className="w-4 h-4 mr-2" />
                    Publish Article
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                    <Input
                      placeholder="Article title"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                    <Select value={articleCategory} onValueChange={setArticleCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {getCategoryIcon(category)} {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Tags</label>
                  <Input
                    placeholder="Enter tags separated by commas"
                    value={articleTags}
                    onChange={(e) => setArticleTags(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Article Body</label>
                  <Tabs defaultValue="write" className="w-full">
                    <TabsList>
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <Textarea
                        placeholder="Write your article content using markdown..."
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)}
                        className="min-h-96 font-mono"
                      />
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 min-h-96 bg-muted/20">
                        <p className="text-muted-foreground">Preview would render markdown content here...</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={articleStatus === "published"}
                    onCheckedChange={(checked) => setArticleStatus(checked ? "published" : "draft")}
                  />
                  <label className="text-sm text-foreground">
                    {articleStatus === "published" ? "Published" : "Draft"}
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Select an article to edit</h3>
                <p className="text-muted-foreground mb-4">Choose an article from the left panel or create a new one</p>
                <Button onClick={startNewArticle}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Article
                </Button>
              </div>
            </div>
          )}

          {/* Bottom Panel - Suggested Articles */}
          <div className="border-t bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">Suggested Articles to Create</h4>
              <Badge variant="secondary" className="text-xs">
                {suggestedArticles.length}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {suggestedArticles.map((suggestion, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-foreground mb-1">{suggestion.topic}</h5>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{suggestion.conversations} conversations</span>
                        <span>Avg CSAT: {suggestion.avgCsat}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={startNewArticle}>
                      Create
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
