package backend

type Truc struct {
	Waw string `json:"waw"`
}

type Queue []Truc

func (q *Queue) Push(payload Truc) {
	*q = append(*q, payload)
}

func (q *Queue) Pop() Truc {
	res := (*q)[len(*q)-1]
	*q = (*q)[:len(*q)-1]
	return res
}

func (q *Queue) Size() int {
	return len(*q)
}

var queue = Queue{}
